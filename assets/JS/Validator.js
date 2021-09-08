
function Validator(options) {

  const formElement = document.querySelector(options.form);

  function getParentElement(element,select) {

    // Tìm kiếm element cha
    while(element.parentElement) {

      // Nếu mà tìm được element mà select truyền vào , trả về đúng element đó
      if(element.parentElement.matches(select))
        return element.parentElement;

      //Nếu không tìm thấy , ta lấy element tiếp theo  
      element = element.parentElement;  
    }
  }

  // Tạo hàm Validate dùng để xử lý lỗi

  function Validate(inputElement,rule) {

    var getParent = getParentElement(inputElement,options.formGroup);

    var errorSelector = getParent.querySelector(options.errorSelector);

    var errorMessage;

    var rules = ruleSelector[rule.selector];

    for(let index in rules) {
      switch(inputElement.type) {
        case 'radio':
        case 'checkbox':
          errorMessage = rules[index](formElement.querySelector(rule.selector+':checked'));
          break;  

        default:
          errorMessage = rules[index](inputElement.value);  
      }

      if(errorMessage) break;
    }

    if(errorMessage) {
      errorSelector.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${errorMessage}`;
      getParent.classList.add('invalid');
    }
    else {
      errorSelector.innerHTML = '';
      getParent.classList.remove('invalid');
    }

    return !errorMessage;

  }

  // Tạo ra biến ruleSelector lưu trữ dữ liệu
  var ruleSelector = {};

  if(formElement) {

    formElement.onsubmit = (e) => {
      e.preventDefault(); //Ngăn chặn hành vi mặc định

      let isFormValid = true;

      options.rules.forEach((rule) => {

        var inputElement = document.querySelector(rule.selector);

        let isValid = Validate(inputElement,rule);

        if(!isValid)
          isFormValid = false;

      })

      if(isFormValid) {

      }
      else
        window.alert('Please insert all details');
    }

    // Ta duyệt qua từng rule
    options.rules.forEach((rule) => {

      // Kiểm tra ruleSelector là array không?
      // Nếu là array thì ta thêm function check của rule vào kế tiếp
      if(Array.isArray(ruleSelector[rule.selector]))
        ruleSelector[rule.selector].push(rule.check);
      // Nếu không phải là array thì ta lấy phần tử đầu tiên làm array
        else
       ruleSelector[rule.selector] = [rule.check]; 

      var inputElements = formElement.querySelectorAll(rule.selector); //Trả về nodeLists
      
      // Sử dụng array from để biến nodeList thành array
      // Xử lý lỗi và hiển thị lỗi
      Array.from(inputElements).forEach((inputElement) => {

        // Khi người dùng blur chuột ra ngoài
        inputElement.onblur = () => {
          Validate(inputElement,rule);
        }

        // Khi người dùng đang điền thông tin
        inputElement.oninput = () => {
          var getParent = getParentElement(inputElement,options.formGroup);
          var errorSelector = getParent.querySelector(options.errorSelector);
          errorSelector.innerText = '';
          getParent.classList.remove('invalid');
        }

      })

    })

  }

}

// Rules
/**
 * Khi người dùng nhập sai , hiển thị ra lỗi
 * Khi người dùng nhập đúng , hiển thị ra undefined
 */

Validator.isRequired = (selector) => {
  return {
    selector:selector,
    check:(value) => {
      switch(document.querySelector(selector).type) {
        case 'radio':
        case 'checkbox':
          return value ? undefined : 'Please check this place!';
        
        default:
          return value.trim() ? undefined : 'Please fill this place!';  
      }
    }
  }
}

Validator.isEmail = (selector) => {
  return {
    selector:selector,
    check:(value) => {
      var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return value.match(emailRegex) ? undefined : 'Please insert correct email!';
    }
  }
}


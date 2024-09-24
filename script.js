// ملف JavaScript موحد

// إعدادات الشريط العلوي
const header = document.querySelector('.header');
const navOpenBtn = document.querySelector('.nav-open-btn');
const navCloseBtn = document.querySelector('.nav-close-btn');
// إعدادات الشريط العلوي
const header = document.querySelector('.header');
const navOpenBtn = document.querySelector('.nav-open-btn');
const navCloseBtn = document.querySelector('.nav-close-btn');
const navbar = document.querySelector('.navbar');
const overlay = document.querySelector('.overlay');

// إضافة/إزالة فئة 'active' عند فتح/إغلاق القائمة
const navOpen = () => {
  navbar.classList.add('active');
  overlay.classList.add('active');
};

const navClose = () => {
  navbar.classList.remove('active');
  overlay.classList.remove('active');
};

// إضافة الأحداث إلى الأزرار والعناصر المختلفة
navOpenBtn.addEventListener('click', navOpen);
navCloseBtn.addEventListener('click', navClose);
overlay.addEventListener('click', navClose);

// تغيير نمط الرأس عند التمرير
window.addEventListener('scroll', () => {
  window.scrollY >= 10 ? header.classList.add('active') : header.classList.remove('active');
});

// -----------------------------------------------------------


// ** الدالة لتبديل المحتوى المنسدل **
function toggleDropdown(dropdownId) {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    const selectedDropdown = document.getElementById(dropdownId);
    
    // Close all dropdowns
    dropdowns.forEach(dropdown => {
        if (dropdown !== selectedDropdown) {
            dropdown.classList.remove('show');
            // Reset the opacity and transform for all dropdown links
            const links = dropdown.querySelectorAll('a');
            links.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
            });
        }
    });
    
    // Toggle the selected dropdown
    if (selectedDropdown.classList.contains('show')) {
        selectedDropdown.classList.remove('show');
        // Remove the "show" class to reset the display
        const links = selectedDropdown.querySelectorAll('a');
        links.forEach(link => {
            link.style.opacity = '0';
        });
    } else {
        selectedDropdown.classList.add('show');
        // Add the "show" class to start the display
        const links = selectedDropdown.querySelectorAll('a');
        links.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, index * 250); // Delay each link's appearance (increase the number to slow down the writing effect)
        });
    }
}

// Close dropdowns if clicked outside
document.addEventListener('click', (event) => {
    const isDropdownButton = event.target.closest('.المنطقه');
    if (!isDropdownButton) {
        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
            dropdown.classList.remove('show');
            const links = dropdown.querySelectorAll('a');
            links.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
            });
        });
    }
});

// -----------------------------------------------------------

// ** Carousel functionality **
const images = document.querySelectorAll('.carousel img');
const prevButton = document.querySelector('.prev-slide');
const nextButton = document.querySelector('.next-slide');
let currentIndex = 0;

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.remove('active');
    });
    images[index].classList.add('active');
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

// Change image every 3 seconds
let intervalId = setInterval(showNextImage, 3000);

// Stop the interval when the user interacts with the carousel
prevButton.addEventListener('click', () => {
    showPreviousImage();
    clearInterval(intervalId);
    intervalId = setInterval(showNextImage, 3000); // Restart the interval
});

nextButton.addEventListener('click', () => {
    showNextImage();
    clearInterval(intervalId);
    intervalId = setInterval(showNextImage, 3000); // Restart the interval
});

// Initial image display
showImage(currentIndex);

// -----------------------------------------------------------

// ** إظهار وإخفاء الشات بوت **
document.getElementById('chatbot-icon').addEventListener('click', function() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.classList.toggle('hidden'); // إظهار أو إخفاء الشات بوت
});

document.getElementById('chatbot-close').addEventListener('click', function() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.classList.add('hidden'); // إخفاء الشات بوت
});

// إرسال الرسالة إلى الشات بوت
document.getElementById('chatbot-send').addEventListener('click', function() {
    const userInput = document.getElementById('chatbot-input').value;
    if (userInput) {
        addMessage('أنت', userInput); // عرض رسالة المستخدم
        processMessage(userInput); // معالجة الرسالة والرد
        document.getElementById('chatbot-input').value = ''; // إعادة تعيين حقل الإدخال
    }
});

// عرض الرسالة في واجهة الشات
function addMessage(sender, message) {
    const content = document.getElementById('chatbot-content');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    content.appendChild(messageElement);
    content.scrollTop = content.scrollHeight; // التمرير تلقائيًا لآخر الرسائل
}

// معالجة الرسالة والرد بناءً على استفسارات محددة
function processMessage(message) {
    let reply = '';

    if (message.includes('مواعيد')) {
        reply = 'مواعيد عملنا من الساعة 9 صباحًا حتى 5 مساءً.';
    } else if (message.includes('الأسعار')) {
        reply = 'تختلف الأسعار حسب الخدمة، يرجى زيارة صفحة الأسعار.';
    } else {
        reply = 'نعتذر، لم أفهم سؤالك. يمكنك إعادة المحاولة.';
    }

    addMessage('اندرلخت', reply);
}

// الرد على الأسئلة السريعة
function quickReply(question) {
    addMessage('أنت', question); // عرض السؤال
    processMessage(question); // معالجة السؤال والرد
}

// -----------------------------------------------------------

// ** إضافة التفاعل مع زر "عرض كل الصور" **
document.querySelectorAll('.show-more').forEach(button => {
  button.addEventListener('click', function() {
    const photoGrid = this.previousElementSibling;
    const hiddenPhotos = photoGrid.querySelectorAll('.hidden');

    hiddenPhotos.forEach(photo => {
      photo.classList.remove('hidden');
    });

    // إخفاء زر "عرض كل الصور" بعد النقر
    this.style.display = 'none';
  });
});

// -----------------------------------------------------------

// ** إضافة خاصية فتح جميع الروابط في تبويب جديد **
document.querySelectorAll('a').forEach(link => {
    link.setAttribute('target', '_blank');
});

// -----------------------------------------------------------


  // الحصول على عنصر اللوجو
  const logo = document.getElementById('logo');

  // وظيفة لتغيير مصدر اللوجو
  const changeLogoOnScroll = () => {
    const heroSection = document.querySelector('.hero');
    const footerSection = document.getElementById('footer');
    
    // الحصول على نهاية قسم الهيرو
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    // الحصول على بداية قسم الفوتر
    const footerTop = footerSection.offsetTop;

    // التحقق من موضع التمرير
    if (window.scrollY > footerTop) {
      logo.src = 'ASSETS/RSCA_Crest_white.png'; // العودة إلى اللوجو الأول عند الوصول إلى الفوتر
    } else if (window.scrollY > heroBottom) {
      logo.src = 'ASSETS/RSCA_Crest_white2.png'; // تغيير إلى اللوجو الثاني بعد انتهاء قسم الهيرو
    } else {
      logo.src = 'ASSETS/RSCA_Crest_white.png'; // العودة إلى اللوجو الأول
    }
  };

  // إضافة حدث التمرير
  window.addEventListener('scroll', changeLogoOnScroll);

// -----------------------------------------------------------



const navbar = document.querySelector('.navbar');
const overlay = document.querySelector('.overlay');

// إضافة/إزالة فئة 'active' عند فتح/إغلاق القائمة
const navOpen = () => {
  navbar.classList.add('active');
  overlay.classList.add('active');
};

const navClose = () => {
  navbar.classList.remove('active');
  overlay.classList.remove('active');
};

// إضافة الأحداث إلى الأزرار والعناصر المختلفة
navOpenBtn.addEventListener('click', navOpen);
navCloseBtn.addEventListener('click', navClose);
overlay.addEventListener('click', navClose);

// تغيير نمط الرأس عند التمرير
window.addEventListener('scroll', () => {
  window.scrollY >= 10 ? header.classList.add('active') : header.classList.remove('active');
});

// -----------------------------------------------------------

// ** تضمين مكتبة الأيقونات من Ionicons **
// يتم تضمين المكتبة في HTML وليس في هذا السكربت

// -----------------------------------------------------------

// ** الدالة لتبديل المحتوى المنسدل **
function toggleDropdown(dropdownId) {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    const selectedDropdown = document.getElementById(dropdownId);
    
    // Close all dropdowns
    dropdowns.forEach(dropdown => {
        if (dropdown !== selectedDropdown) {
            dropdown.classList.remove('show');
            // Reset the opacity and transform for all dropdown links
            const links = dropdown.querySelectorAll('a');
            links.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
            });
        }
    });
    
    // Toggle the selected dropdown
    if (selectedDropdown.classList.contains('show')) {
        selectedDropdown.classList.remove('show');
        // Remove the "show" class to reset the display
        const links = selectedDropdown.querySelectorAll('a');
        links.forEach(link => {
            link.style.opacity = '0';
        });
    } else {
        selectedDropdown.classList.add('show');
        // Add the "show" class to start the display
        const links = selectedDropdown.querySelectorAll('a');
        links.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, index * 250); // Delay each link's appearance (increase the number to slow down the writing effect)
        });
    }
}

// Close dropdowns if clicked outside
document.addEventListener('click', (event) => {
    const isDropdownButton = event.target.closest('.المنطقه');
    if (!isDropdownButton) {
        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
            dropdown.classList.remove('show');
            const links = dropdown.querySelectorAll('a');
            links.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
            });
        });
    }
});

// -----------------------------------------------------------

// ** Carousel functionality **
const images = document.querySelectorAll('.carousel img');
const prevButton = document.querySelector('.prev-slide');
const nextButton = document.querySelector('.next-slide');
let currentIndex = 0;

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.remove('active');
    });
    images[index].classList.add('active');
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

// Change image every 3 seconds
let intervalId = setInterval(showNextImage, 3000);

// Stop the interval when the user interacts with the carousel
prevButton.addEventListener('click', () => {
    showPreviousImage();
    clearInterval(intervalId);
    intervalId = setInterval(showNextImage, 3000); // Restart the interval
});

nextButton.addEventListener('click', () => {
    showNextImage();
    clearInterval(intervalId);
    intervalId = setInterval(showNextImage, 3000); // Restart the interval
});

// Initial image display
showImage(currentIndex);

// -----------------------------------------------------------

// ** إظهار وإخفاء الشات بوت **
document.getElementById('chatbot-icon').addEventListener('click', function() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.classList.toggle('hidden'); // إظهار أو إخفاء الشات بوت
});

document.getElementById('chatbot-close').addEventListener('click', function() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.classList.add('hidden'); // إخفاء الشات بوت
});

// إرسال الرسالة إلى الشات بوت
document.getElementById('chatbot-send').addEventListener('click', function() {
    const userInput = document.getElementById('chatbot-input').value;
    if (userInput) {
        addMessage('أنت', userInput); // عرض رسالة المستخدم
        processMessage(userInput); // معالجة الرسالة والرد
        document.getElementById('chatbot-input').value = ''; // إعادة تعيين حقل الإدخال
    }
});

// عرض الرسالة في واجهة الشات
function addMessage(sender, message) {
    const content = document.getElementById('chatbot-content');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    content.appendChild(messageElement);
    content.scrollTop = content.scrollHeight; // التمرير تلقائيًا لآخر الرسائل
}

// معالجة الرسالة والرد بناءً على استفسارات محددة
function processMessage(message) {
    let reply = '';

    if (message.includes('مواعيد')) {
        reply = 'مواعيد عملنا من الساعة 9 صباحًا حتى 5 مساءً.';
    } else if (message.includes('الأسعار')) {
        reply = 'تختلف الأسعار حسب الخدمة، يرجى زيارة صفحة الأسعار.';
    } else {
        reply = 'نعتذر، لم أفهم سؤالك. يمكنك إعادة المحاولة.';
    }

    addMessage('اندرلخت', reply);
}

// الرد على الأسئلة السريعة
function quickReply(question) {
    addMessage('أنت', question); // عرض السؤال
    processMessage(question); // معالجة السؤال والرد
}

// -----------------------------------------------------------

// ** إضافة التفاعل مع زر "عرض كل الصور" **
document.querySelectorAll('.show-more').forEach(button => {
  button.addEventListener('click', function() {
    const photoGrid = this.previousElementSibling;
    const hiddenPhotos = photoGrid.querySelectorAll('.hidden');

    hiddenPhotos.forEach(photo => {
      photo.classList.remove('hidden');
    });

    // إخفاء زر "عرض كل الصور" بعد النقر
    this.style.display = 'none';
  });
});

// -----------------------------------------------------------

// ** إضافة خاصية فتح جميع الروابط في تبويب جديد **
document.querySelectorAll('a').forEach(link => {
    link.setAttribute('target', '_blank');
});

// -----------------------------------------------------------


  // الحصول على عنصر اللوجو
  const logo = document.getElementById('logo');

  // وظيفة لتغيير مصدر اللوجو
  const changeLogoOnScroll = () => {
    const heroSection = document.querySelector('.hero');
    const footerSection = document.getElementById('footer');
    
    // الحصول على نهاية قسم الهيرو
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    // الحصول على بداية قسم الفوتر
    const footerTop = footerSection.offsetTop;

    // التحقق من موضع التمرير
    if (window.scrollY > footerTop) {
      logo.src = 'ASSETS/RSCA_Crest_white.png'; // العودة إلى اللوجو الأول عند الوصول إلى الفوتر
    } else if (window.scrollY > heroBottom) {
      logo.src = 'RSCA_Crest_white2.png'; // تغيير إلى اللوجو الثاني بعد انتهاء قسم الهيرو
    } else {
      logo.src = 'RSCA_Crest_white.png'; // العودة إلى اللوجو الأول
    }
  };

  // إضافة حدث التمرير
  window.addEventListener('scroll', changeLogoOnScroll);

// -----------------------------------------------------------




$(document).ready(function(){
//Menu hamburger for open and close
    const hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        closeElem = document.querySelector('.menu__close');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });

    closeElem.addEventListener('click', () => {
        menu.classList.remove('active');
    });

    //Skills counter
    const counters = document.querySelectorAll('.skills__ratings-counter'),
        lines = document.querySelectorAll('.skills__ratings-line span');

    counters.forEach( (item, i) => {
        lines[i].style.width = item.innerHTML;
    });

    //Stages of work in carousel
  
    $('.stages__carousel').slick({
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    });
  

    //Benefits in tabs
    $('ul.benefits__tabs').on('click', 'li:not(.benefits__tab_active)', function() {
        $(this)
        .addClass('benefits__tab_active').siblings().removeClass('benefits__tab_active')
        .closest('div.container').find('div.benefits__content').removeClass('benefits__content_active').eq($(this).index()).addClass('benefits__content_active');
    });

    //Courses in ticker
    const row = document.querySelector('.courses__row');
    const container = document.querySelector('.courses__container');
    let position = 0;
    const speed = 2;

    function move() {
        position -= speed;
        row.style.transform = 'translateX(' + position + 'px)';
        if (-position > row.offsetWidth) {
            position = container.offsetWidth;
        }
        requestAnimationFrame(move);
    }

    move();

    function validateForm(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				email: {
					required: true,
					email: true
				},
                text: {
                    required: true,
					minlength: 2
                },
                checkbox: "required"
			},
			messages: {
				name: {
					required: "Please enter your name",
					minlength: jQuery.validator.format("At least {0} characters required")
				},
				email: {
					required: "Please enter your email",
					email: "Incorrect email address entered"
				},
                text: {
                    required: "Please enter some text",
					minlength: jQuery.validator.format("At least {0} characters required")
                },
                checkbox: {
                    required: "Please click here"
                }
			}
		});
    };
    
    validateForm('form');

    //page up
	$(window).scroll(function(){
		if ($(this).scrollTop() > 1500) {
			$('.up').fadeIn('slow');
		} else {
			$('.up').fadeOut('slow');
		}
	});

	//smooth scroll
	$("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });


    $('form').submit(function(e) {
		e.preventDefault();

		if(!$(this).valid()){
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function(){
			$(this).find("input").val("");
			// $('#consultation, #order').fadeOut();
			// $('.overlay, #thanks').fadeIn('slow');
			$('form').trigger('reset');
		});
		return false;
	});
    new WOW().init();
});


$(document).ready(function(){
	//carousel
	$('.carousel__inner').slick({
		speed: 1500,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel_buttons/left.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel_buttons/right.svg"></button>',
		responsive: [
			{
			  breakpoint: 992,
			  settings: {
				arrows: false,
				dots: false,
				dotsClass: 'slick-dots'
			}
			}
		]
	});

	//tabs
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	  	});

	//catalog
	function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

	//modal
	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});

	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	//validation
	function validateForm(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: 'required',
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста введите свое имя",
					minlength: jQuery.validator.format("Требуется не меньше {0} символов")
				},
				phone: "Пожалуйста введите свой номер телефона",
				email: {
					required: "Пожалуйста введите свою почту",
					email: "Неправильно введен адрес почты"
				}
			}
		});
	};

	validateForm('#consultation-form');
	validateForm('#consultation form');
	validateForm('#order form');

	//phone number mask
	$('input[name=phone]').mask('+7 (999) 999-99-99');
	
	//sending emails from the site
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
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');
			$('form').trigger('reset');
		});
		return false;
	});

	//page up
	$(window).scroll(function(){
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn('slow');
		} else {
			$('.pageup').fadeOut('slow');
		}
	});

	//smooth scroll
	$("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

	//connecting scripts to work with the library animate.css
	new WOW().init();
});
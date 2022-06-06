$(document).ready(function() {

    $("#nav-icon").click(function() {

        $(this).toggleClass('open');

        $('.nav').toggleClass('open');

    });




    $("form[data-ajax='true']").on("submit", function(e) {

        e.preventDefault();

        const $form = $(this);

        if ($form.hasClass("loading")) {

            return;

        }



        $form.addClass("loading");



        $.ajax({

            url: $form.attr("action"),

            type: $form.attr("method"),

            data: $form.serialize(),

            dataType: "json"

        }).done(function(data) {

            handleFormSubmit($form, data.status, data.message, data.errors);

        }).fail(function() {

            handleFormSubmit($form, "error", "Error on the server, sorry");

        })

    })



    function handleFormSubmit($form, type, message, errors) {

        $form.removeClass("loading");



        const $formMessage = $form.find(".form-message");

        $formMessage.removeClass("message-error")

            .removeClass("message-success")

            .addClass("message-" + type)

            .html(message);





        $form.find('.field').removeClass("field-error");

        if (type === "error" && errors) {

            $.each(errors, (fieldName, error) => {

                console.log(fieldName);

                console.log(error);

                $form.find(".field[name='" + fieldName + "']").addClass("field-error")

            })

        }



        if (type === "success") {

            $form.find(".field").val("");

        }

    }







    const onePageScrollMinWidth = 980;

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

    if (vw > onePageScrollMinWidth) {



        //scroll to section using onePageScroll library

        $('.nav a').on("click", function(e) {

            const link = $(this).attr("href");

            if (link.indexOf("#") === 0) {

                e.preventDefault();

                moveTo('.main', link.substr(1));

            }

        });





        onePageScroll(".main", {

            sectionContainer: "section", // sectionContainer accepts any kind of selector in case you don't want to use section

            easing: "ease", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",

            // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"

            animationTime: 500, // AnimationTime let you define how long each section takes to animate

            pagination: true, // You can either show or hide the pagination. Toggle true for show, false for hide.

            updateURL: false, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.

            beforeMove: function(index) {

            }, // This option accepts a callback function. The function will be called before the page moves.

            afterMove: function(index) {

            }, // This option accepts a callback function. The function will be called after the page moves.

            loop: false, // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.

            keyboard: true, // You can activate the keyboard controls

            responsiveFallback: 980 // You can fallback to normal page scroll by defining the width of the browser in which

            // you want the responsive fallback to be triggered. For example, set this to 600 and whenever

            // the browser's width is less than 600, the fallback will kick in.

        });

    } else {

        //scroll to section on mobile

        $('.nav a').on("click", function(e) {

            e.preventDefault();

            const link = $(this).attr("href");

            if (link.indexOf("#") === 0) {

                const nth = link.substr(1);

                const target = $('.main section:nth-child(' + nth + ')');



                $('#nav-icon').toggleClass('open');

                $('.nav').toggleClass('open');



                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);

            }

        });

    }



});
const onResize = function () {
    $('body').css('height', window.innerHeight);
}


const windowFunctions = function () {
    //increase z-index of the clicked window
    let windowZ = 10

    //change heart to/from red and change accompanying text
    const instagramHeart = function () {
        $('.instagram-heart-icon svg').toggleClass('liked').addClass('animating');
        $('.instagram-heart-icon svg').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (event) {
            $(this).removeClass('animating')
        });
        if ($('.instagram-heart-icon svg').hasClass('liked')) {
            $('.instagram-heart-amount').text('1 Like!')
        } else($('.instagram-heart-amount').text('0 Likes'))
    }

    //when i click the heart icon, run the heart function
    $('.instagram-heart-icon').click(function (e) {
        e.preventDefault();
        instagramHeart()
    })

    //when i click the traffic icon, close that window
    $('.traffic-lights').click(function (e) {
        e.preventDefault();
        $(this).closest('.window-wrapper').addClass('closed');
        closeAll()
    })


    //window opening/bring to front function
    function windowOpen(e, selector) {
        e.preventDefault();
        $(selector).removeClass('closed')
        $('.window-wrapper').addClass('disabled')
        $(selector).removeClass('disabled')
        windowZ = windowZ + 1
        $(selector).css('z-index', windowZ)
        // $('.traffic-lights').focus()
        closeAll()
    }


    $('#me').click(function (e) {
        windowOpen(e, '#me-window')
    })

    $('#work').click(function (e) {
        windowOpen(e, '#work-window')
    })

    $('#resume').click(function (e) {
        windowOpen(e, '#resume-window')
    })

    $('#contact').click(function (e) {
        windowOpen(e, '#contact-window')
        $('.messages__tooltip').addClass('window-open')
    })

    $('#about').click(function (e) {
        windowOpen(e, '#about-window')
    })

    //bring to front and disable other windows
    $('.window-wrapper').mousedown(function (e) {
        windowZ = windowZ + 1
        $(this).css('z-index', windowZ)
        $('.window-wrapper').addClass('disabled')
        $(this).removeClass('disabled')
    })

    //ajax function for loading single pages
    $.ajaxSetup({
        cache: false
    });
    $(".work-preview-wrapper").click(function (e) {
        e.preventDefault();
        if (!$(this).hasClass("coming-soon")) {
            closeAll()
            var post_url = $(this).attr("href");
            var post_title = $(this).attr("data-title")
            $("#project-window .window-padding").html('<div class="loading"><span>Loading...</span></div>');
            $("#project-window .window-padding").load(post_url);
            $('#project-window').removeClass('closed')
            $('.window-wrapper').addClass('disabled')
            $('#project-window').removeClass('disabled')
            windowZ = windowZ + 1
            $('#project-window').css('z-index', windowZ)
            $('#project-window .window-title').text(post_title)
            closeAll()
            // return false;
        }
    });

    //function for displaying the close all the windows button
    function closeAll() {
        if ($('.closed').length <= 4) {
            $('.close-all').addClass('visible')
        } else {
            $('.close-all').removeClass('visible')
        }

        if ($('.closed').length <= 5) {
            $('body').addClass('window-open')
            onResize()
        } else {
            $('body').removeClass('window-open')
            onResize()
        }
    }

    //button for closing all windows
    $('.close-all').click(function (e) {
        e.preventDefault();
        $('.window-wrapper').addClass('closed');
        closeAll()
    });

}

////////////////////////////////////////////////////////////////////////////////////

//single post animations

let losAnimated = null

$(document).ajaxComplete(function () {

    losAnimated = document.querySelectorAll('.single-content > .animated')
    fadeIn()
    windowWidth(`#project-window`)
    losAnimated.forEach(elTag => {
        elTag.style.opacity = 0
    })
    // bodhisvgsInlineSupport()


})

const fadeIn = function () {
    losAnimated.forEach(tag => {
        const tagTop = tag.getBoundingClientRect().top

        if (tagTop < window.innerHeight - 200) {
            tag.style.animation = `fadeIn .8s both var(--easing)`;
        }
    })
}


$(`#project-window .window-content-wrapper`).scroll(function () {
    fadeIn()
})




////////////////////////////////////////////////////////////////////////////////////

//jquery


//define function for the jquery ui draggable situation
const dragging = function () {
    $('.window-wrapper').draggable({
        containment: "parent",
        scroll: false,
        handle: '.draggable',
        stop: function (e, ui) {
            var perc = ui.position.left / ui.helper.parent().width() * 100;
            ui.helper.css('left', perc + '%');
        }
    })
}

///////////////////////////////////////////////////////////////////////////



//the fade in effect for headline text on page load
const overlayFadeOut = function () {
    $('.fade-overlay').addClass('removed');
}


//setting the window width to not go larger than the window
const windowWidth = function (frame) {
    const elWindow = document.querySelector(frame)
    const elVisibleArea = elWindow.querySelector(`.window-content-wrapper`)
    const elSingleHeader = elWindow.querySelector(`.single-header`)
    let windowWidth = elWindow.getBoundingClientRect().width

    elWindow.style.setProperty('--width', windowWidth + "px")

    if (elSingleHeader) {

        let visibleArea = elVisibleArea.getBoundingClientRect().height

        elSingleHeader.style.setProperty('--height', visibleArea + "px")
    }
}

const allWindowWidths = function () {
    windowWidth('#project-window')
    windowWidth('#me-window')
    windowWidth('#work-window')
    windowWidth('#resume-window')
    windowWidth('#contact-window')
    windowWidth('#about-window')
}

const workGridItem = document.querySelector('.work-preview-wrapper')
const workWindow = document.querySelector('#work-window')

const workWindowResize = function () {
    const workGridItemHeight = workGridItem.getBoundingClientRect().height
    workWindow.style.setProperty('--height', workGridItemHeight + "px")
}

////////////////////////////////////////////////////////////////////////////////////

//when the window resizes...
$(window).resize(function () {
    dragging()
    onResize()
    allWindowWidths()
    workWindowResize()
})

//when the document is ready...
$(document).ready(function () {
    dragging()
    windowFunctions()
    onResize()
    overlayFadeOut()
    allWindowWidths()
    workWindowResize()
})

//when the device orientation changes...
window.addEventListener("orientationchange", function () {
    setTimeout(function () {
        onResize()
    }, 300);
}, false);
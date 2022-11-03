/*!
 * js_mobile_navigation.js
 * @author  NielsHegmans
 * @version 0.2
 * @url https://github.com/heimseiten
 */

/* global define, module */
(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.js_mobile_navigation = factory();
    }
}(this, function () {
    'use strict';
    // Global options and their defaults
    var options = {},
        defaults = {
            menu_position_under_header: true,
            main_nav_position: '#header .mod_navigation',
            navicon_position: '#header .inside'
        };
    function run(userOptions) {
        setOptions(userOptions);
        if (window.innerWidth < 1024) { switch_navigation_to_mobile(); } else { add_EventListener_rezise(); }
    }

    function switch_navigation_to_mobile() {
        if (document.querySelector('.navicon') == null) {
            document.querySelector(options.navicon_position).insertAdjacentHTML( 'beforeend','<div class="navicon"><div class="icon navicon_to_closeicon"><div class="navicon_middle"></div></div></div>')
        }
        if (document.querySelector(options.main_nav_position)) {           
            document.querySelector('body').appendChild( document.querySelector('#nav_mobile .mod_navigation') );    
            var nav = document.querySelector('body > .mod_navigation');
            calc_height_of_uls(nav.querySelectorAll('ul.level_6'),nav.querySelectorAll('ul.level_5'));
            calc_height_of_uls(nav.querySelectorAll('ul.level_5'),nav.querySelectorAll('ul.level_4'));
            calc_height_of_uls(nav.querySelectorAll('ul.level_4'),nav.querySelectorAll('ul.level_3'));
            calc_height_of_uls(nav.querySelectorAll('ul.level_3'),nav.querySelectorAll('ul.level_2'));
            nav.classList.add('ul_height_calculated');
            nav.querySelectorAll('li.submenu').forEach( submenus => {
                submenus.insertAdjacentHTML('afterbegin','<div class="submenu_toggle"><span>'+ submenus.querySelector('ul').childElementCount +'</span></div>');
                submenus.querySelector('.submenu_toggle').style.height = submenus.querySelector('.submenu').clientHeight + 'px';
                
                if (submenus.classList.contains('trail')) { toggle_open(submenus); }
                    // BEGIN    - Optionen, die als Klasse in Seiteneigenschaften geschrieben werden können
                if (submenus.classList.contains('mn_open_submenu_in_mobile_nav')) { toggle_open(submenus); } 
                if (submenus.classList.contains('mn_remove_submenu_toggler')) { submenus.querySelector(':scope > .submenu_toggle').remove(); }
                if (submenus.classList.contains('mn_only_toggle_submenu')) { }
                    // END      - Optionen, die als Klasse in Seiteneigenschaften geschrieben werden können
            })
            if (options.menu_position_under_header) {
                document.querySelector('body > .mod_navigation > ul').style.top = document.querySelector('#header').offsetHeight + 'px';
            }
            click_submenu_toggle();
            click_close();
        }
    }

    function click_submenu_toggle() {
        document.addEventListener('click', e => {
            if( e.srcElement.classList.contains('submenu_toggle') ) {
                var li = e.srcElement.parentElement;
                li.classList.toggle('open');
                li.querySelector(':scope > .submenu_toggle').classList.toggle('open');
                li.querySelector(':scope > ul').classList.toggle('open');

                var level_1_li = li.closest('.level_1 > li');
                var level_1_ul_height = 0;
    
                level_1_li.querySelectorAll(':scope ul.open').forEach(e => {
                    level_1_ul_height = level_1_ul_height + parseInt(e.getAttribute('data-ul-height'),10);
                })
                level_1_li.querySelector(':scope > ul').style.height = level_1_ul_height + 'px';
                
                if ( level_1_li.classList.contains('open') ) {
                
                } else {
                    level_1_li.querySelector(':scope ul').style.height = '0px';
                }
            }
        })
    }
    
    function add_EventListener_rezise() {
        window.addEventListener('resize', event => {
            if (window.innerWidth < 1024) { 
                if (document.querySelector('.navicon') == null) {
                    switch_navigation_to_mobile(); 
                }
            }
        })
    }
    
    function click_close() {
        document.querySelector('.navicon').addEventListener('click', event => { 
            document.querySelector('body').classList.toggle('js_mobile_navigation_open')
        })
        if ( document.querySelector('body > .mod_navigation span.active, body > .mod_navigation strong.active') ) {
            document.querySelector('body > .mod_navigation span.active, body > .mod_navigation strong.active').addEventListener('click', event => { 
                document.querySelector('body').classList.toggle('js_mobile_navigation_open')
            })
        }
    }

    function calc_height_of_uls(hide_child_uls,clac_uls) {
        hide_child_uls.forEach(e => { e.style.display = 'none'; });
        clac_uls.forEach(e => { e.setAttribute('data-ul-height', e.offsetHeight); });
        hide_child_uls.forEach(e => { e.style.display = 'inherit'; });
    }

    function toggle_open(li) {
        li.classList.add('open'); 
        li.querySelector(':scope > .submenu_toggle').classList.toggle('open');
        li.querySelector(':scope > ul').classList.toggle('open');
    }

    function setOptions(newOptions) {
        if (!newOptions) {
            newOptions = {};
        }
        // Fill options object
        for (var item in defaults) {
            options[item] = defaults[item];
            if (typeof newOptions[item] !== 'undefined') {
                options[item] = newOptions[item];
            }
        }
    }

    return {
        run: run
    };

}))
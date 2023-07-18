import PerfectScrollbar from 'perfect-scrollbar';

export function initializeDOMManipulation() {
    const slideToggle = (t, e, o) => {
        if (t.clientHeight === 0) {
            j(t, e, o, true);
        } else {
            j(t, e, o);
        }
    };

    const slideUp = (t, e, o) => {
        j(t, e, o);
    };

    const slideDown = (t, e, o) => {
        j(t, e, o, true);
    };

    const j = (t, e, o, i) => {
        if (typeof e === 'undefined') {
            e = 400;
        }
        if (typeof i === 'undefined') {
            i = false;
        }

        t.style.overflow = 'hidden';
        if (i) {
            t.style.display = 'block';
        }

        const l = window.getComputedStyle(t);
        const n = parseFloat(l.getPropertyValue('height'));
        const a = parseFloat(l.getPropertyValue('padding-top'));
        const s = parseFloat(l.getPropertyValue('padding-bottom'));
        const r = parseFloat(l.getPropertyValue('margin-top'));
        const d = parseFloat(l.getPropertyValue('margin-bottom'));
        const g = n / e;
        const y = a / e;
        const m = s / e;
        const u = r / e;
        const h = d / e;

        let p;
        const animate = (x) => {
            if (typeof p === 'undefined') {
                p = x;
            }

            const f = x - p;

            if (i) {
                t.style.height = g * f + 'px';
                t.style.paddingTop = y * f + 'px';
                t.style.paddingBottom = m * f + 'px';
                t.style.marginTop = u * f + 'px';
                t.style.marginBottom = h * f + 'px';
            } else {
                t.style.height = n - g * f + 'px';
                t.style.paddingTop = a - y * f + 'px';
                t.style.paddingBottom = s - m * f + 'px';
                t.style.marginTop = r - u * f + 'px';
                t.style.marginBottom = d - h * f + 'px';
            }

            if (f >= e) {
                t.style.height = '';
                t.style.paddingTop = '';
                t.style.paddingBottom = '';
                t.style.marginTop = '';
                t.style.marginBottom = '';
                t.style.overflow = '';

                if (!i) {
                    t.style.display = 'none';
                }

                if (typeof o === 'function') {
                    o();
                }
            } else {
                window.requestAnimationFrame(animate);
            }
        };

        window.requestAnimationFrame(animate);
    };

    const sidebarItems = document.querySelectorAll('.sidebar-item.has-sub');
    for (let i = 0; i < sidebarItems.length; i++) {
        const sidebarItem = sidebarItems[i];
        sidebarItems[i].querySelector('.sidebar-link').addEventListener('click', function (e) {
            e.preventDefault();

            const submenu = sidebarItem.querySelector('.submenu');
            if (submenu.classList.contains('active')) {
                submenu.style.display = 'block';
            }

            if (submenu.style.display === 'none') {
                submenu.classList.add('active');
            } else {
                submenu.classList.remove('active');
            }

            slideToggle(submenu, 300);
        });
    }

    const handleWindowResize = () => {
        const w = window.innerWidth;
        if (w < 1200) {
            document.getElementById('sidebar').classList.remove('active');
        } else {
            document.getElementById('sidebar').classList.add('active');
        }
    };

    window.addEventListener('resize', handleWindowResize);

    // Perfect Scrollbar Init
    // Perfect Scrollbar Init
    if (typeof PerfectScrollbar === 'function') {
        const container = document.querySelector('.sidebar-wrapper');
        const ps = new PerfectScrollbar(container, {
            wheelPropagation: false,
        });
    }

    // Scroll into active sidebar
    document.querySelector('.sidebar-item.active').scrollIntoView(false);
}

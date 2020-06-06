class myNavBar extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }

                .nav-desktop, .nav-mobile {
                    height: 4.375rem;
                    background-color: whitesmoke;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 .5rem;
                }

                ::slotted(a) {
                    margin: 0 .7rem;
                    text-decoration: none;
                    color: black;
                }

                img {
                    height: 2.5rem;
                }

                .nav-mobile {
                    display: none;
                }

                .links-mobile {
                    position: fixed;
                    top: 0;
                    left: -100%;
                    background-color: whitesmoke;
                    height: 100vh;
                    width: 100%;
                    display: none;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: all .5s;
                }

                .links-mobile a {
                    font-size: 20px;
                    text-decoration: none;
                    color: black;
                    margin: 10px 0;
                }

                .close {
                    position: absolute;
                    top: 5%;
                    right: 5%;
                }

                @media only screen and (max-width: 503px) {
                    .nav-desktop {
                        display: none;
                    }
                    
                    .nav-mobile, .links-mobile {
                        display: flex;
                    }
                }
                
            </style>

            <div class="nav-desktop">
                <img class='myLogo'>
                <div class='links'>
                    <slot class="tstt"></slot>
                </div>
            </div>
            
            <div class="nav-mobile">
                <img class='myLogo'>
                <img class='menu-bars'>
            </div>
            <div class='links-mobile'>
                <img class='close'>
                <!-- here i'll append links -->
            </div>
        `;
    }
    connectedCallback() {
        //dipslay the logo
        const logo = this.getAttribute('logo');
        for (let els of this.shadowRoot.querySelectorAll('img.myLogo')) {
            els.src = logo;
        } 

        //display the menu icon
        const menu = this.getAttribute('menu');
        const menuIcon = this.shadowRoot.querySelector('img.menu-bars');
        menuIcon.src = menu; 
        
        //assign links for the mobile version
        const slot = this.shadowRoot.querySelector('slot');
        const mobileLinksContainner = this.shadowRoot.querySelector('.links-mobile');
        slot.addEventListener('slotchange', () => {
            const slotContent = slot.assignedNodes();
            for (let i=0; i<slotContent.length; i++) {
                //select the elements not the white space
                if (i%2 !== 0) {
                    const a = document.createElement('a');
                    a.textContent = slotContent[i].textContent;
                    mobileLinksContainner.appendChild(a);
                }
            }
        });

        //show the links when the user click the menu btn
        menuIcon.addEventListener('click', () => mobileLinksContainner.style.left = 0);

        //display the close btn
        const closeBtn = this.shadowRoot.querySelector('.close');
        closeBtn.src = this.getAttribute('close');

        //hide the links when the user click the close btn
        closeBtn.addEventListener('click', () => mobileLinksContainner.style.left = '-100%');
    }

}

customElements.define('my-nav-bar', myNavBar);


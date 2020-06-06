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

                @media only screen and (max-width: 503px) {
                    .nav-desktop {
                        display: none;
                    }
                    
                    .nav-mobile {
                        display: flex;
                    }
                }
                
            </style>

            <div class="nav-desktop">
                <img class='myLogo'>
                <div class='links'>
                    <slot></slot>
                </div>
            </div>
            
            <div class="nav-mobile">
                <img class='myLogo'>
                <img class='menu-bars'>
            </div>
            <div class='links'>
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
        this.shadowRoot.querySelector('img.menu-bars').src = menu; 

    }
}

customElements.define('my-nav-bar', myNavBar);
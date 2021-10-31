// @ts-check
import { Shadow } from '../../event-driven-web-components-prototypes/src/Shadow.js'

/* global self */

/**
 * Breathing Bubble
 *
 * @export
 * @class Bubble
 * @type {CustomElementConstructor}
 */
export default class BreathingBubble extends Shadow() {
  constructor (...args) {
    super(...args)
    this.animationDelay = 500
    this.animationDuration = 5025
    this.clickListener = event => {
      this.counter = 0
      setTimeout(() => this.animationiterationListener(), this.animationDelay)
      this.bubble.classList.add('animate')
    }
    this.animationiterationListener = event => {
      this.counter++
      this.bubble.textContent = this.counter
    }
  }

  connectedCallback () {
    // @ts-ignore
    this.counter = 'GO'
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    this.bubble.addEventListener('click', this.clickListener)
    this.bubble.addEventListener('animationiteration', this.animationiterationListener)
  }

  disconnectedCallback () {
    this.bubble.removeEventListener('click', this.clickListener)
    this.bubble.removeEventListener('animationiteration', this.animationiterationListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.bubble
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */ `
      :host {
        --border-width: min(10vw, 15rem);
        --font-size-0: min(min(33vw, 16vh), 10em);
        --font-size-100: min(min(65vw, 33vh), 20em);
        box-sizing: border-box;
        display: grid;
        grid-gap: 1em;
        grid-template-areas:
        "title"
        "instruction-one"
        "bubble"
        "instruction-two";
        grid-template-columns: 1fr;
        grid-template-rows: repeat(2, minmax(1em, auto)) 1fr minmax(1em, auto);
        height: 100vh;
        padding: 1em;
        width: 100vw;
      }
      :host > * {
        text-align: center;
      }
      :host > .title {
        grid-area: title;
        position: relative;
      }
      :host > .title > .end {
        color: coral;
        position: absolute;
        right: 0;
        top: 0;
      }
      :host > .instruction-one {
        grid-area: instruction-one;
        font-size: 2rem;
      }
      :host > .title > .round-counter, :host > .instruction-one, :host > .title > .end {
        text-transform: uppercase;
      }
      :host > .title > .round-counter, :host > .instruction-one, :host > .title > .end, :host > .instruction-two {
        font-weight: bold;
      }
      :host > .bubble {
        --animation-delay: ${this.animationDelay}ms;
        align-items: center;
        align-self: center;
        background-color: var(--theme-color);
        background: linear-gradient(0deg, rgba(13,59,104,0.8533788515406162) 0%, rgba(13,59,104,0.7525385154061625) 25%, rgba(255,255,255,1) 100%);
        border: 1rem solid var(--theme-color);
        border-radius: 50%;
        box-shadow: 0 2px 8px 0 var(--theme-color);
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        font-size: var(--font-size-100);
        font-weight: 500;
        grid-area: bubble;
        height: min(70vw, 70vh);
        justify-content: center;
        justify-self: center;
        transition: all var(--animation-delay) ease;
        width: min(70vw, 70vh);
      }
      :host > .bubble.animate {
        animation: bubble ${this.animationDuration}ms ease-in-out var(--animation-delay) infinite;
        border-width: var(--border-width);
        font-size: var(--font-size-0);
        transform: scale(0.01);

      }
      :host > .instruction-two {
        grid-area: instruction-two;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          --border-width: min(20vw, 15rem);
          --font-size-0: min(15vw, 10em);
          --font-size-100: min(45vw, 20em);
        }
      }
      @keyframes bubble{
        0%{
          border-width: var(--border-width);
          font-size: var(--font-size-0);
          transform: scale(0.01);
        }
        50%{
          border-width: 1rem;
          font-size: var(--font-size-100);
          transform: scale(1);
        }
        60% {
          border-width: 1rem;
          font-size: var(--font-size-100);
          transform: scale(1);
        }
        80% {
          border-width: var(--border-width);
          font-size: var(--font-size-0);
        }
        100%{
          border-width: var(--border-width);
          font-size: var(--font-size-0);
          transform: scale(0.01);
        }
      }
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    this.html = /* html */`
      <div class=title>
        <div class=round-counter>Round 1</div>
        <div class=end>Finish</div>
      </div>
      <div class=instruction-one>Take 30 deep breaths</div>
      <div class=bubble>${this.counter}</div>
      <div class=instruction-two>Tap twice to go into retention</div>
    `
  }

  get bubble () {
    return this.root.querySelector('.bubble')
  }
}
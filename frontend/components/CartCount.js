import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

// React transition group is how you do these animations for the cart counting
//   You gotta do backspace-visibility else it looks janky.
//   classNames 🙋‍excuse me?  So it gives you lots of class names beginning with count, just go with it...
//     You can also use turns to emulate degrees in simpler terms
//   So react cycles through the class names that are applied in sequence, producing the animation.
//     You get enter, enter-active, exit, and exit-active
const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all 0.7s;
    backface-visibility: hidden;
  }
  /* Initial State of the entered Dot */
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;
//  So these make sure the width of the number representing items in cart is same:
//   font-feature-settings: 'tnum';   
//   font-variant-numeric: tabular-nums;
const Dot = styled.div`
  background: ${props => props.theme.blue};
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-weight: 100;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const CartCount = ({ count }) => (
  <AnimationStyles>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 550, exit: 550 }}
      >
        <Dot>{count}</Dot>
      </CSSTransition>
    </TransitionGroup>
  </AnimationStyles>
);

CartCount.propTypes = {
  count: PropTypes.number.isRequired,
};
export default CartCount;

import React, { useState, useCallback, useEffect, useRef, forwardRef } from 'react';
import 'Slider/slider.css';

type SliderKnobProps = {
  onSlideCallback: (movementX: number) => void
}

const SliderKnob = forwardRef<HTMLDivElement, SliderKnobProps>(({ onSlideCallback }, ref) => {
    const [isSliding, setIsSliding] = useState(false);
    const isSlidingRef = useRef(isSliding);

    const onMouseMoveHandler = useCallback((e: MouseEvent) => {
        e.preventDefault();
        if (isSlidingRef.current === true && e.movementX !== 0) {
          onSlideCallback(e.movementX);
        }
      },
      [onSlideCallback],
    );

    const onMouseUpHandler = useCallback((e: MouseEvent) => {
        e.preventDefault();
        setIsSliding(false);
      },
      [],
    );

    const onMouseDownHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsSliding(true);
      },
      [],
    );

    useEffect(() => {
      isSlidingRef.current = isSliding;
      if (isSliding === true) {
        window.addEventListener('mouseup', onMouseUpHandler);
        window.addEventListener('mousemove', onMouseMoveHandler);
      } else {
        window.removeEventListener('mouseup', onMouseUpHandler);
        window.removeEventListener('mousemove', onMouseMoveHandler);
      }

      return () => {
        window.removeEventListener('mouseup', onMouseUpHandler);
        window.removeEventListener('mousemove', onMouseMoveHandler);
      }
    }, 
    [isSliding, onMouseUpHandler, onMouseMoveHandler]);

    return (
      <div
        className='slider-knob'
        ref={ref}
        onMouseDown={onMouseDownHandler}>
      </div>
    )
  }
)


export default SliderKnob;
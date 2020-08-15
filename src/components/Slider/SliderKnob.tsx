import React, { useState, useCallback, useEffect, useRef, forwardRef } from 'react'
import './slider.css'

type SliderKnobProps = {
  onSlideCallback: (movementX: number) => void
}

const SliderKnob = forwardRef<HTMLDivElement, SliderKnobProps>(
  ({ onSlideCallback }, ref) => {
    const [isSliding, setIsSliding] = useState(false)
    const isSlidingRef = useRef(isSliding);

    const renderCounter = useRef(1);
    console.log(`SliderKnob render count: ${renderCounter.current}`)
    renderCounter.current += 1;

    const onMouseMoveHandler = useCallback(
      (e: MouseEvent) => {
        e.preventDefault();
        //console.log(`onMouseMoveHandler, isSlidingRef.current: ${isSlidingRef.current}`)
        if (isSlidingRef.current === true && e.movementX !== 0) {
          onSlideCallback(e.movementX);
        }
      },
      [onSlideCallback],
    );

    const onMouseUpHandler = useCallback(
      (e: MouseEvent) => {
        e.preventDefault();
        setIsSliding(false);
      },
      [],
    );

    const onMouseDownHandler = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsSliding(true);
      },
      [],
    );

    useEffect(() => {
      console.log(`SliderKnob useEffect isSliding: ${isSliding}`)
      isSlidingRef.current = isSliding
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
    }, [isSliding, onMouseUpHandler, onMouseMoveHandler])

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
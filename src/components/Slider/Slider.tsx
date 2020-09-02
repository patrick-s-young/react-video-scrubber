import React, { useRef, useLayoutEffect, useCallback } from 'react';
import SliderKnob from 'Slider/SliderKnob';
import SliderTrack from 'Slider/SliderTrack';
import 'Slider/slider.css';

type TrackAttrRef = {
  element: HTMLDivElement,
  width: number,
  offsetLeft: number,
}

type KnobAttrRef = {
  element: HTMLDivElement,
  minX: number,
  maxX: number,
  style: CSSStyleDeclaration,
}

interface SliderProps {
  sliderCallback: (scalerValue: number) => void
}

const Slider: React.FC<SliderProps> = ({ sliderCallback }) => {
  const scalerValue = useRef<number>(0.5); // why ref?
  const trackDivRef = useRef<HTMLDivElement | null>(null);
  const knobDivRef = useRef<HTMLDivElement | null>(null);
  const trackAttrRef = useRef<TrackAttrRef | null>(null);
  const knobAttrRef = useRef<KnobAttrRef | null>(null);

  const onSlide = useCallback((movementX: number) => {
    const track = trackAttrRef.current;
    const knob = knobAttrRef.current;
    if (knob != null && track != null) {
      const offsetLeft = knob.element.offsetLeft + movementX;
      if (offsetLeft > knob.minX && offsetLeft < knob.maxX) {
        knob.style.left = offsetLeft + 'px';
        scalerValue.current = (offsetLeft - knob.minX) / track.width;
        sliderCallback(scalerValue.current);
      }
    }
  }, [sliderCallback]); 

  useLayoutEffect(() => {
    if (trackDivRef.current !== null && knobDivRef.current !== null) {
      trackAttrRef.current = {
        element: trackDivRef.current,
        width: trackDivRef.current.clientWidth,
        offsetLeft: trackDivRef.current.offsetLeft
      }
      knobAttrRef.current = {
        element: knobDivRef.current,
        minX: trackDivRef.current.offsetLeft - knobDivRef.current.clientWidth / 2,
        maxX: trackDivRef.current.offsetLeft + trackDivRef.current.clientWidth - knobDivRef.current.clientWidth / 2,
        style: knobDivRef.current.style,      
      }
    }
  }, []);

  return (
    <div className='slider'>
      <SliderTrack 
        ref={trackDivRef}/>
      <SliderKnob 
        onSlideCallback={onSlide}
        ref={knobDivRef}
      />
    </div>
  )
}

export default Slider;
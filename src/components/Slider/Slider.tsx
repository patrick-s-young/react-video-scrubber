import React, { useRef, useEffect } from 'react'
import SliderKnob from './SliderKnob'
import SliderTrack from './SliderTrack'
import './slider.css'

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
  const scalerValue = useRef<number>(0.5);
  const trackDivRef = useRef<HTMLDivElement | null>(null)
  const knobDivRef = useRef<HTMLDivElement | null>(null)
  const trackAttrRef = useRef<TrackAttrRef | null>(null)
  const knobAttrRef = useRef<KnobAttrRef | null>(null)


  const onSlide = (movementX: number) => {
    const track = trackAttrRef.current;
    const knob = knobAttrRef.current;
    if (knob != null && track != null) {
      const offsetLeft =  knob.element.offsetLeft + movementX;
      if (offsetLeft > knob.minX && offsetLeft < knob.maxX) {
        knob.style.left = offsetLeft + 'px';
        scalerValue.current = (offsetLeft - knob.minX) / track.width;
        sliderCallback(scalerValue.current)
      }
    }
  } 

  const handleResize = () => {
    console.log(`handleResize`)
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
  }

  useEffect(() => {
    if (trackDivRef.current !== null && knobDivRef.current !== null) handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [trackDivRef, knobDivRef]);


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

export default Slider
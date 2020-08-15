import React, { forwardRef } from 'react'
import './slider.css'


type Props = {};

const SliderTrack = forwardRef<HTMLDivElement, Props>(
  (props, ref) => <div className='slider-track' ref={ref}/>
)


export default SliderTrack
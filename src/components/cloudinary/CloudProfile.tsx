import React from "react";
import {AdvancedImage} from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";

export const CloundProfile = () =>{

    const cld = new Cloudinary({
        cloud:{
            cloudName:'demo'
        },
        url: {
            secureDistribution: 'www.chasemalcom.com',
            secure: true
        }
    });

    const myImage = cld.image('sample');

    return(
        <div>
            <AdvancedImage cldImg={myImage} />
        </div>
    )
}
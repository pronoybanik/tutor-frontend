import Image from 'next/image';
import React from 'react';
import image from "../../assets/sitelogo/Screenshot_2025-03-01_232319-removebg-preview.png";

const Logo = () => {
    return (
        <div>
            <Image src={image || "/placeholder-image.png"} width={180} height={100} alt="Site Logo" />
        </div>
    );
};

export default Logo;
'use client';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function GoToTopButton() {
    const handleGoToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <Button onClick={handleGoToTop}>맨위로</Button>
        </div>
    );
}


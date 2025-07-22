import React, { useEffect, useState } from 'react';
import ReactMarkDown from 'react-markdown';
import { PrivacyPolicySkeleton, AcceptableUsePolicySkeleton, TermsOfServiceSkeleton } from './ui/skeletons';

type MarkDownViewerProps = {
    fileUrl: string;
    policyType: string;
};

const MarkDownViewer = ({ fileUrl, policyType }: MarkDownViewerProps) => {
    const [markdown, setMarkdown] = useState<string>(``);

    useEffect(() => {
        fetch(fileUrl)
            .then((res) => res.text())
            .then(setMarkdown)
            .catch((err) => console.error("Error loading markdown: ", err));
    }, [fileUrl]);

    if (!markdown) {
        if (policyType === 'privacy-policy') {
            return <PrivacyPolicySkeleton />
        } else if (policyType === 'acceptable-use-policy') {
            return <AcceptableUsePolicySkeleton />
        } else if (policyType === 'terms-of-service') {
            return <TermsOfServiceSkeleton />
        }
    }

    return (
        <div className='prose max-w-3xl mx-auto px-4 py-2'>
            <ReactMarkDown>{markdown}</ReactMarkDown>
        </div>
    );
};

export default MarkDownViewer;
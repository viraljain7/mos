import { Icon } from 'lucide-react'
import React from 'react'

function VerifyTick() {
    return (
        <>

            <div
                className="alert alert-success bg-success-100 text-success-600 border-success-100 px-24 py-11 mb-0 fw-semibold text-lg radius-8 d-flex align-items-center justify-content-between"
                role="alert"
            >
                <div className="d-flex align-items-center gap-2">
                    <Icon
                        icon="akar-icons:double-check"
                        className="icon text-xl"
                    />

                </div>

            </div>
        </>
    )
}

export default VerifyTick

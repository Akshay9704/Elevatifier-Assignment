import React from 'react'

const Footer = () => {
    return (
        <div>
            {/* Footer */}
            <footer className='footer'>
                <div className='footer-content'>
                    <p>&copy; {new Date().getFullYear()} News App</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
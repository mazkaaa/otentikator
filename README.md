
# Otentikator – Lightweight. Secure. Reliable.

**Otentikator** is a privacy-focused, web-based 2FA (Two-Factor Authentication) app that generates Time-based One-Time Passwords (TOTP) securely using your browser’s local storage. No cloud sync. No data tracking. Just simple and secure authentication.

## Features

-   🔐 Generate TOTP codes for your accounts
    
-   📱 Scan QR codes or manually input secrets
    
-   📎 Secrets are stored encrypted in localStorage
    
-   🔒 Requires a master password to encrypt and decrypt secrets
    
-   ⛔️ If the master password is forgotten, stored data cannot be recovered
    
-   ♻️ Live code refresh every 30 seconds
    
-   🧼 Easily remove or reset entries
    
-   ⚙️ Built with Vite, React, and TanStack Router
    

## Tech Stack

-   [Vite](https://vitejs.dev/)
-   [React](https://reactjs.org/)
-   [TanStack Router](https://tanstack.com/router/latest) – for routing
-   [otpauth](https://www.npmjs.com/package/otpauth) – for TOTP generation
-   [@yudiel/react-qr-scanner](https://www.npmjs.com/package/@yudiel/react-qr-scanner) – for rendering QR codes
-   [Tailwind CSS](https://tailwindcss.com/) – for styling
    
## Getting Started

1.  **Clone the repo:**
    
    ```bash
    git clone https://github.com/mazkaaa/otentikator.git
    cd otentikator
    ```
    
2.  **Install dependencies:**
    
    ```
    npm install
    # or
    yarn install
    ```
    
3.  **Run the development server:**
    
    ```bash
    npm run dev
    ```
    
4.  **Open the app:** Visit [http://localhost:3000](http://localhost:3000)
    

## License

MIT License © 2025 [Muhammad Azka]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
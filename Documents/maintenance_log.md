// =========================================================

Error: node: /lib/x86_64-linux-gnu/libc.so.6: version 'GLIBC_2.28' not found (required by node)

Desc: Glitch runs on an older glibc version. Glitch uses GLIBC 2.23 so node version
      that supports this version must be used.
      
Solution:
    - Open terminal in glitch.
    - run rm -rf node_modules (removes unused packages).
    or
    - run rm -rf /app/node_modules/node
    - run refresh in console.
    - run npm install to reinstall packages.
    
// =========================================================
import { memo } from 'react';

const names = new Map();

// pure component
export default memo (function P({ name, children }) {

    if (!name) {
        return 'error: no name'
    }

    let num;
    if (!names.has(name)) {
        num = 1;
    } else {
        num = names.get(name) + 1;
    }
    names.set(name, num);

    console.log(`P ${name} ${num}`)
    return <div  style={{ backgroundColor: '#ffeeee' }}>P {name} <span style={{color:"red"}}>{num}</span> {children}</div>
})
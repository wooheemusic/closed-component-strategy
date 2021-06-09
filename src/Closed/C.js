
const names = new Map();

// not pure component
export default function C({ name, children }) {

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

    console.log(`C ${name} ${num}`);
    return <div>C {name} <span style={{ color: 'blue' }}>{num}</span> {children}</div>
}

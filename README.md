# **Closed Component Strategy**

 This page introduces some conventions to use the containment pattern with `React.Purecomponent` or `React.memo`.

  The containment pattern is one of composition patterns in JSX. It is recommended because it visually structuralizes codes to enhence readability and provides criteria for componentizing.

## **Glossary**

### **Open component**
- It is receiving tangible props.children from parents.
- It is instantiated by opening and closing tags. 
```jsx
<div>
    <OpenComponent>
        <AnyChild value={value} />
    </OpenComponent>
    <OtherComponent />
</div>
```
- Its parent rendering always causes its render method execution.
- `React.PureComponent` or `React.memo` in an open component will not work even without the value changed. And it is too expensive that `OpenComponent` checks changes from `children prop` to `children prop`'s `props` to make itself memoized.

### **Closed component**
- It is not an open Component.
- It is instantiated by self-closing.
```jsx
<div>
    <ClosedComponent />
    <OtherComponent />
</div>
```

### **Mutable component**
- It renders by `setState`, `context` changes, mutable `props` or `redux` actions.

### **Immutable component**
- not a mutable component. 

>These types of component are not determined in their component definitions. They are determined in render methods of their parents.

## **Strategy**

- Immutable components may have any types of component in their render methods. 
- If a immutable component renders a big tree of components, all of its components are never needed to be memoized. You cannot determine whether each of them would be memoized or not when you first write a new component in NewComponent.js. So you have to make a component memoized when you import and instantite it as a react element.
```jsx
import { useState } from 'react';
import Child from './Child';

const MemoizedChild = memo(Child);

export default function Parent() {
    const [aaa, setAaa] = useState('');
    //...
    
    return (
        <div>
            ...
            <MemoizedChild />
        </div>
    );
}

```
(React DevTool will use the name `Child`, not `MemoizedChild`.)
- **Mutable components may not have expensive open components with a set of jsx react elements as children, which is not `{props.children}`, in their render methods.** Or memoize them.
```jsx
// in a mutable component

// good

<Any />
<CheapOpenComponent>
    <Cheap />
</CheapOpenComponent>
<ExpensiveClosedComponent />
<ExpensiveOpenComponent>
    {this.props.children}
</ExpensiveOpenComponent>

// bad

<Any />
<CheapOpenComponent>
    <Cheap />
</CheapOpenComponent>
<ExpensiveClosedComponent />
<ExpensiveOpenComponent>
    <EvenClosedPureComponent />
<ExpensiveOpencomponent/>

// alternative for functional components

const memoizedReactElement = useMemo(() =><EvenClosedPureComponent a={a} b={b} c={c} />, [a, b, c] )

// alternative for class components

import memoizeOne from 'memoize-one';
const memoized = memoizeOne((a, b, c) => <EvenClosedPureComponent a={a} b={b} c={c}/>) // not in its component

const memoizedReactElement = memoized(a, b, c); // in its render

<Any />
<CheapOpenComponent>
    <Cheap />
</CheapOpenComponent>
<ExpensiveClosedComponent />
<ExpensiveOpenComponent>
    {memoizedReactElement}
<ExpensiveOpencomponent/>

```
- You could regard merely-mutable as immutable.
- If you have a stateful component with no props changes, you can make it immutable by encapsuliz its state part.
```jsx
function StatefulWithoutPropsChanges() {
    const [v, setV] = useState('');
    return (
        <>
            <ExpensiveChildA value={v} />
            <ExpensiveChildB>
                <GrandChildren value={v}>
                ... 
            </ExpensiveChildB>
            <ExpensiveComponentRequiringManyChildren>
                ... a huge tree
            </ExpensiveComponentRequiringManyChildren>
        </>
    )
}
```
to
```jsx
function ImmutableComponent() {
    return (
        <>
            <EncapsulizedStateful />
            <ExpensiveComponentRequiringManyChildren>
                ... a huge tree
            </ExpensiveComponentRequiringManyChildren>
        </>
    );
}
```

## **Why?**

- Render methods always create new react elements with any jsx codes except codes for persisted objects.
- A mutable parent component disables React.memo or React.PureComponent of its open child components by creating new `props.children`.
- A pure component embraced in a child component and instantiated in a parent component defends itself from the changes in the child component because the child component uses the same persisted `props.children`.

## **Sample**

The sample will help you to understand the strategy
```sh
$ git clone git@github.com:wooheemusic/closed-component-strategy.git
$ cd closed-component-strategy
$ npm install
$ npm start
``` 
- This sample code does not fit the react official documentation. It is just for test.
- `React.StrictMode` is disabled for test.
- I did not use class components, `this` and `WeakMap`, but just `Map` and `props.name` to generate private references.

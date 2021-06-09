# **Closed Component Strategy**

 This page introduces  some conventions to use the containment pattern with React.Purecomponent or React.memo.

  The containment pattern is one of composition patterns in JSX. It is recommended because it  visually structuralizes codes to enhence readability and provides criteria for componentizing.

## **glossary**
### **open component**
- It is receiving tangible props.children from parents.
- It is instantiated by opening and closing tags. 
```
<div>
    <OpenComponent>
        <AnyChild />
    </OpenComponent>
    <OtherComponent />
</div>
```
- Its parent rendering always executes its render method.
- React.PureComponent or React.memo will not work. It is too expensive to compare old children and new children to enable render-escape.

### **closed component**
- It is not an open Component.
- It is instantiated by self-closing.
```
<div>
    <ClosedComponent />
    <OtherComponent />
</div>
```

### **mutable component**
- It renders by `setState`, `context` changes, mutable `props` or `redux` actions.
### **immutable component**
- not a mutable component. 

>These types of component are not determined in their component definitions. They are determined in render methods of their parents.

## **strategy**

- Immutable components may have any types of component in their render methods. 
- **Mutable components may not have open and expensive components with a set of jsx react elements, which is not props.children, in their render methods.** Or the open components will never be protected in updating with React.memo or React.PureComponent. 
- You could regard merely-mutable as immutable.
- If you have a component with state changes but no props changes, but you want to use open components, you can just create a new component class or function encapsulizing its state part.

## **an appropriate form of mutable components**
It has zero or more parallelized closed components and zero or one open component with {this.props.children}
```
() => (
    <div>
        <ClosedComponent1/>
        <ClosedComponent2/>
        <ClosedComponent3/>
        <OpenComponent>
            {this.props.children}
        </OpenComponent>
    </div>
)
```
## **an inappropriate form of mutable components**

```
() => (
    <div>
        <OpenComponent1>
            <ClosedCompoent1 />
        <Opencomponent/>
)
```

## **why?**
- Render methods always create new react elements with any jsx codes except codes for persisted objects.
- A mutable parent component disables React.memo or React.PureComponent of its open child components by creating new `props.children`.
- A pure component embraced in a child component and instantiated in a parent component defends itself from the changes in the child component because the child component uses the same persisted `props.children`.

## **sample**
The sample will help you to understand the strategy
```
git clone ~~~~
```
and
```
npm start
``` 
- This sample code does not fit the react official documentation. It is just for test.
- `React.StrictMode` is disabled for test.
- I did not use class components, `this` and `WeakMap`, but just `Map` and `props.name` to generate private references.

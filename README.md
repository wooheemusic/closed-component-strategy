# closed-component-strategy
* It is a strategy on composition in a React app by organizing components in a certain way.
* It provides breaking points of composition hierarchy.

# Prerequisite
* solid understanding of react doc (https://reactjs.org/docs)
* observer pattern (https://en.wikipedia.org/wiki/Observer_pattern)

# Glossary
* A *closed* component means a stateless && infertile(disallowing props.children) component. (open to the rest of props)
* A *major* component means a component which renders a model and views.
* A *model* component is a component which covers state of logic.
* A *view* component is a component which is only a closest(might not immediate) viewing child of a model component. (a model can render view-models).
* A *view-model* component is a component which covers state of view.
* A *page* component is a component which is an immediate child routed by a distinct pathname.

# Rules
* All *closed* components should be a pure component or memoized. 
(escape creations of react elements and reconciliations, but props comparison is a trade-off)
(All *closed* components should throw an error in dev mode if it receives a children prop)
* A *closed* components render all its sub-components by the composite pattern as much as possible.
(It enables props subscriptions by closure so your app escapes props-passing hell without context.)
(It also improves readability and manageability.)
* All *major* components should be *closed*.
(The reason why major and model components are separated is to escape state comparison)
* The state of a *model* component should not have a property referring to only viewing.
* All *view* components should be *closed*.
* All *page* components should be *closed*.

# samples of a major component
```
class Sample extends PureComponent {
    …
    render() {
        return <SampleModel><SampleViewOrViewController /></SampleModel> // return React.cloneElement(this.props.children, this.state);
        // or return <SampleModel>{ state => <SampleViewOrViewController {…state} /> }</SampleModel> // render() { return this.props.children(this.state)}
    }
}
```
or 
```
memo(()=> <SampleModel> … </SampleModel> );
```
or you can use 'render props’ or ‘hoc’ pattern complying with the strategy.

# examples
not yet;


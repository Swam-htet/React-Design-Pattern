
// compound component
import {Children, cloneElement, useState} from "react";

export default function CompoundComposition() {
    return (
        <div>
            <h1>Compound Component Pattern</h1>
            <Accordion>
                <AccordionItem title="First Item">
                    <p>First Item Content</p>
                </AccordionItem>
                <AccordionItem title="Second Item">
                    <p>Second Item Content</p>
                </AccordionItem>
                <AccordionItem title="Third Item">
                    <p>Third Item Content</p>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

// Compound Component Pattern
// The compound components pattern is a way to create a component that has multiple children with a parent-child relationship. This pattern is useful when you want to create a component that has a parent component that controls the state and behavior of the child components.

// compound component
function Accordion({children}) {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div>
            {/* What is Children.map ? - */}
            {Children.map(children, (child, index) => {
                return cloneElement(child, {
                    isActive: index === activeIndex,
                    setActive: () => setActiveIndex(index)
                });
            })}
        </div>
    );
}

// compound component
function AccordionItem({title, children, isActive, setActive}) {
    return (
        <div style={{border:"1px solid black", padding:"20px", width:"200px"}}>
            <h3 onClick={setActive}>{title}</h3>
            {isActive && children}
        </div>
    );
}


import S from './S';
import P from './P';
import C from './C';
import X from './X';

export default function Closed() {
    return (
        <div>
            {/* Stateful and renders own children */}
            <X />

            {/* Stateful but has children from parents */}
            <S>
                {/* P for pure component, C for non-pure component */}
                <P name="mother1" ><P name="baby1" /></P>
                <C name="mother2"><P name="baby2" /></C>
                <P name="person1" />
                <C name="person2" />
            </S>
        </div>
    )
}
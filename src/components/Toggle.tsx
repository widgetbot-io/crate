import * as React from "react";
import { View } from '../definitions/view'
import classes from '../jss/Toggle'

interface Props extends View {
    
}

export class Toggle extends React.Component<Props, {}> {
    render() {
        return (
            <div>
                <Button />
            </div>
        )
    }
}

class Button extends React.Component {
    render() {
        return(
            <div className={classes.button}>
                
            </div>
        )
    }
}
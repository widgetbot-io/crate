import * as React from "react";
import { View } from '../definitions/view'
import classes from '../jss/Toasts'

interface Props extends View {
    
}

export class Toasts extends React.Component<Props, {}> {
    render() {
        return <h1>Hello lol!</h1>;
    }
}
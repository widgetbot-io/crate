import * as React from "react";
import { View } from '../definitions/view'
import classes from '../jss/Embed'

interface Props extends View {
    
}

export class Embed extends React.Component<Props, {}> {
    render() {
        return <h1>Hello lol!</h1>;
    }
}
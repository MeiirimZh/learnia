import * as Progress from "react-native-progress";

import { theme } from "../../src/theme";

type Props = {
    progress: number
}

export default function ProgressBar({ progress }: Props) {
    return (
        <Progress.Bar
            progress={ progress }
            width={ null }
            height={ 10 }
            borderWidth={ 0 }
            borderRadius={ 5 }
            color={ theme.colors.secondary }
            unfilledColor={ theme.colors.border } />
    )
}
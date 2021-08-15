import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core"

const rootStyles = makeStyles((theme: Theme) => {
    createStyles({
        topBar: {
            textAlign: "center"
        },
        header: {
            font: ""
        },
        body: {

        },
        footer: {

        }
    })
})

export default rootStyles
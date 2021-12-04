import { Page, Text, View, Document, StyleSheet, Canvas } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    document: {
        position: "relative",
        marginTop: "10%",
        flexGrow: 1
    },
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        padding: "3%",
        width: "80%",
        textAlign: "center"
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
});

interface certificateProps {
    summary: string
    description: string
    bondAmount: number
    bondRate: number
}

// Create Document Component
const Certificate = () => {

    return (
        <div style={styles.document}>
            <Document>
                <Page size="A4" orientation="landscape" style={styles.page}>

                    <View style={styles.section}>
                        <Text>Certification of Bond</Text>
                    </View>
                    <View>
                        <Text>Section #2</Text>
                    </View>
                </Page>
            </Document>
            <input type="submit" value="Submit" />
        </div>
    )
};

export default Certificate
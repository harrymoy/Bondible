import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { getBondData } from "../helpers/bondDataSlice";

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

// Create Document Component
const Certificate = () => {

    const bondData = useAppSelector(getBondData)

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
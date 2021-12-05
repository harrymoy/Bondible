import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useAppSelector } from "../app/hooks";
import { getBondData } from "../helpers/bondDataSlice";


const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        backgroundColor: '#E4E4E4',
        padding: "3%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 20px 50px 5px",
        position: "relative"
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    conditionTitle: {
        fontSize: 12,
        margin: 12,
        textAlign: 'center',
        position: 'absolute',
        bottom: 2,
        marginTop: 20
    },
    bondNumbers: {
        textAlign: 'center',
        fontsize: 70,
        marginBottom: 40
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    submit: {
        width: '30%',
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '14px 20px',
        margin: '8px 0',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '2rem'
    }
});

// Create Document Component
const Certificate = () => {

    const bondData = useAppSelector(getBondData)

    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.body}>
                <Text style={styles.header} fixed>
                    Bondible
                </Text>
                <Text style={styles.title}>Certification of Bond</Text>
                <Text style={styles.subtitle}>Issued on Polygon | Stored on Filecoin</Text>
                <Text style={styles.title}>
                    {bondData.company}
                </Text>
                <Text style={styles.subtitle}>
                    {bondData.description}
                </Text>
                <Text style={styles.bondNumbers}>
                    Total Amount to Raise: <b>{bondData.amount} DAI</b>
                </Text>
                <Text style={styles.bondNumbers}>
                    Percentage Rate of Return: <b>{bondData.rate}%</b>
                </Text>
                <Text style={styles.conditionTitle} break>
                    This bond certificate is only legitimate if it's available on-chain via Filecoin. Please also check that the bond
                    is still open on the app, any user error in interacting with a bond contract that has been terminated does not make Bondible
                    or the bond issuer liable to cover contract interaction costs including amount and gas costs.
                </Text>
            </Page>
        </Document>
    )
};

export default Certificate
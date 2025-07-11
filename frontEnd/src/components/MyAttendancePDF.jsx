import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const timeSlots = [
    '08:30 TO 11:00',
    '11:00 TO 13:30',
    '13:30 TO 16:00',
    '16:00 TO 18:30'
];

const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#FAFAFA',
        fontFamily: 'Helvetica'
    },
    header: {
        backgroundColor: '#2563EB',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 8
    },
    subtitle: {
        fontSize: 12,
        color: '#E0E7FF',
        textAlign: 'center'
    },
    infoCard: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 25,
        borderRadius: 8,
        border: '1px solid #E5E7EB',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoSection: {
        flex: 1
    },
    infoLabel: {
        fontSize: 10,
        color: '#6B7280',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: 4,
        letterSpacing: 0.5
    },
    infoValue: {
        fontSize: 14,
        color: '#111827',
        fontWeight: 'bold'
    },
    table: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        display: 'table',
        width: 'auto',
    },
    row: {
        flexDirection: 'row',
    },
    colHeaderName: {
        width: '30%',
        backgroundColor: '#F3F4F6',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        padding: 4,
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold'
    },
    colHeaderSlot: {
        width: '17.5%',
        backgroundColor: '#F3F4F6',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        padding: 4,
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold'
    },
    colName: {
        width: '30%',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        padding: 4,
        fontSize: 9,
    },
    colCell: {
        width: '17.5%',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        padding: 8,
        minHeight: 20,
        fontSize: 9,
        textAlign: 'center'
    },
    footer: {
        marginTop: 30,
        paddingTop: 20,
        borderTop: '1px solid #E5E7EB',
        alignItems: 'center'
    },
    footerText: {
        fontSize: 10,
        color: '#9CA3AF',
        textAlign: 'center'
    },
    generatedText: {
        fontSize: 9,
        color: '#D1D5DB',
        marginTop: 8
    }
});

const MyAttendancePDF = ({ className, students }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Liste d`absence</Text>
                    <Text style={styles.subtitle}>Présence journalière</Text>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.infoSection}>
                        <Text style={styles.infoLabel}>Classe</Text>
                        <Text style={styles.infoValue}>{className}</Text>
                    </View>
                    <View style={styles.infoSection}>
                        <Text style={styles.infoLabel}>Date</Text>
                        <Text style={styles.infoValue}>--------</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    {/* Header Row */}
                    <View style={styles.row}>
                        <Text style={styles.colHeaderName}>Élève</Text>
                        {timeSlots.map((slot, i) => (
                            <Text key={i} style={styles.colHeaderSlot}>{slot}</Text>
                        ))}
                    </View>

                    {/* Student Rows */}
                    {students.map((student, index) => (
                        <View key={student.id || index} style={styles.row}>
                            <Text style={styles.colName}>
                                {student.nom} {student.prenom}
                            </Text>
                            {timeSlots.map((_, i) => (
                                <Text key={i} style={styles.colCell}></Text>
                            ))}
                        </View>
                    ))}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Fiche générée automatiquement
                    </Text>
                    <Text style={styles.generatedText}>
                        Généré le {new Date().toLocaleDateString('fr-FR')}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

MyAttendancePDF.propTypes = {
    className: PropTypes.string.isRequired,
    students: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            nom: PropTypes.string,
            prenom: PropTypes.string
        })
    ).isRequired
};

export default MyAttendancePDF;

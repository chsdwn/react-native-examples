import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import PdfRendererView from 'react-native-pdf-renderer';

const pdfUri =
  'https://assets.openstax.org/oscms-prodcms/media/documents/Algebra-and-Trigonometry-2e-WEB.pdf';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [pdfPath, setPdfPath] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchProcess = ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'pdf',
    }).fetch('GET', pdfUri);

    fetchProcess
      .then((res) => {
        const path = res.path();
        setPdfPath(path);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    return () => {
      fetchProcess.cancel();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!pdfPath) {
    return (
      <View style={styles.centeredContainer}>
        <Text>An error occured while downloading the pdf file.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PdfRendererView
        source={pdfPath}
        distanceBetweenPages={16}
        maxZoom={5}
        style={styles.pdfContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  pdfContainer: {
    backgroundColor: '#ddd',
  },
});

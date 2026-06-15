import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { themes } from '@/global/themes';

// Definição da estrutura de cada imagem
interface ImageItem {
  path: string;
}

interface PosterPickerProps {
  visible: boolean;
  images: ImageItem[];
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

export const PosterPicker = ({
  visible,
  images,
  onClose,
  onSelectImage,
}: PosterPickerProps) => {
  // Estado para controlar qual imagem está destacada no momento
  const [currentSelected, setCurrentSelected] = useState<string | null>(null);

  const handleConfirm = () => {
    if (currentSelected) {
      onSelectImage(currentSelected);
      onClose();
    }
  };

  const renderItem = ({ item }: { item: ImageItem }) => {
    const isSelected = currentSelected === item.path;

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        activeOpacity={0.8}
        onPress={() => setCurrentSelected(item.path)}
      >
        <Image source={{ uri: item.path }} style={styles.image} />
        {isSelected && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Selecione uma Imagem</Text>

          {/* Lista Horizontal de Imagens */}
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.path+index}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />

          {/* Ações do Modal */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
              <Text style={styles.buttonCancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buttonConfirm,
                !currentSelected && styles.buttonDisabled,
              ]}
              onPress={handleConfirm}
              disabled={!currentSelected}
            >
              <Text style={styles.buttonConfirmText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: themes.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themes.text,
    marginBottom: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    gap: 12, // Nota: 'gap' funciona no RN moderno, se não funcionar use margin no card
  },
  card: {
    width: 100,
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  cardSelected: {
    borderColor: '#007AFF',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#007AFF',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 12,
  },
  buttonCancel: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  buttonCancelText: {
    color: '#666',
    fontWeight: '600',
  },
  buttonConfirm: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: themes.tema,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: themes.secundary,
  },
  buttonConfirmText: {
    color: '#fff',
    fontWeight: '600',
  },
});
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';

type AppModalProps = {
    visible: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
};

export function AppModal({ visible, title, children, onClose, }: AppModalProps) {

    return (

        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                >
                    <TouchableWithoutFeedback>
                        <View
                            style={{
                                backgroundColor: '#1f2937',
                                padding: 20,
                                borderRadius: 15,
                                width: '80%',
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 18,
                                    marginBottom: 20,
                                }}
                            >
                                {title}
                            </Text>

                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

    );
}
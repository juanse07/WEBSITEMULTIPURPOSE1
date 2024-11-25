import { Button, Modal } from "react-bootstrap";
import { Variant } from "react-bootstrap/esm/types";

interface ConfirmationModalProps {
    show: boolean;
    title?: string;
    message: string;
    confirmButtonText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    variant?: Variant;
}
export default function ConfirmationModal({ show, onCancel, onConfirm, title, message, variant,confirmButtonText }: ConfirmationModalProps) {
    return (
        <Modal show={show} onHide={onCancel} centered>
            {title &&

            <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
            }
                <Modal.Body>{message}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button variant={variant} onClick={onConfirm}>
                            {confirmButtonText || "Confirm"}
                        </Button>
                    </Modal.Footer>
            
        </Modal>
    );
}
'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

export default function Bookmark({ isOpen, onOpenChange, bookmark }) {
    console.log(bookmark)
  if (!bookmark) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {bookmark.airline} {bookmark.flightNumber}
            </ModalHeader>
            <ModalBody>
              <p><strong>Departure:</strong> {bookmark.departure} {bookmark.departureTime}</p>
              <p><strong>Price:</strong> ${bookmark.price}</p>
              <p><strong>Status:</strong> {new Date(bookmark.departure) < new Date() ? 'Expired' : 'Upcoming'}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Book Now
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

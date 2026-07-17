use std::collections::VecDeque;

#[derive(Clone, Debug)]
pub struct ChatMessageBuffer {
    capacity: usize,
    messages: VecDeque<String>,
}

impl ChatMessageBuffer {
    pub fn new(capacity: usize) -> Self {
        Self {
            capacity,
            messages: VecDeque::with_capacity(capacity),
        }
    }

    pub fn push(&mut self, message: String) {
        if self.messages.len() == self.capacity {
            self.messages.pop_front();
        }

        self.messages.push_back(message);
    }

    pub fn len(&self) -> usize {
        self.messages.len()
    }

    pub fn is_empty(&self) -> bool {
        self.messages.is_empty()
    }

    pub fn iter(&self) -> impl Iterator<Item = &String> {
        self.messages.iter()
    }

    pub fn clear(&mut self) {
        self.messages.clear();
    }

    pub fn is_message_not_lines_passed(&self, message: String, lines_passed: usize) -> bool {
        self.messages
            .iter()
            .rev()
            .take(lines_passed)
            .any(|s| *s == message)
    }
}

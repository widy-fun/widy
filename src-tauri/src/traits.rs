use std::collections::VecDeque;

#[derive(Clone, Debug)]
pub struct ItemsBuffer<T> {
    capacity: usize,
    items: VecDeque<T>,
}

impl<T> ItemsBuffer<T> {
    pub fn new(capacity: usize) -> Self {
        Self {
            capacity,
            items: VecDeque::with_capacity(capacity),
        }
    }

    pub fn push(&mut self, item: T) {
        if self.items.len() == self.capacity {
            self.items.pop_front();
        }

        self.items.push_back(item);
    }

    pub fn push_many<I: IntoIterator<Item = T>>(&mut self, items: I) {
        for item in items {
            self.push(item);
        }
    }

    pub fn len(&self) -> usize {
        self.items.len()
    }

    pub fn is_empty(&self) -> bool {
        self.items.is_empty()
    }

    pub fn iter(&self) -> impl Iterator<Item = &T> {
        self.items.iter()
    }

    pub fn clear(&mut self) {
        self.items.clear();
    }
}

pub trait ChatMessageBuffer {
    fn is_message_not_lines_passed(&self, message: String, lines_passed: usize) -> bool;
}

impl ChatMessageBuffer for ItemsBuffer<String> {
    fn is_message_not_lines_passed(&self, message: String, lines_passed: usize) -> bool {
        self.items
            .iter()
            .rev()
            .take(lines_passed)
            .any(|s| *s == message)
    }
}

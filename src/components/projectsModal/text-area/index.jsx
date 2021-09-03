import React, { useState } from 'react';
import './style.css';
export default function TextArea() {
  return (
    <textarea
      name="textarea"
      id="textarea"
      class="textarea-custom"
      cols="30"
      rows="10"
      placeholder="Type description here..."
    ></textarea>
  );
}

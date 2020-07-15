const glist = ['$target', '$self', '$value', '$event', '$props', '$renderState'];

let _ = '';

for (let i = 0; i < 8; i++) {
  glist.push('$' + _ + 'v');
  glist.push('$' + _ + 'i');
  _ += '_';
}

glist.forEach(k => {
  if (typeof (window as any)[k] === 'undefined') {
    (window as any)[k] = ''
  }
});


import { JsonLayout } from '../json_layout';
import { Layouts } from '../layouts';
import { PatternLayout } from '../pattern_layout';

test('`configSchema` creates correct schema for `pattern` layout.', () => {
  const layoutsSchema = Layouts.configSchema;
  const validConfigWithOptional = { kind: 'pattern' };
  expect(layoutsSchema.validate(validConfigWithOptional)).toEqual({
    highlight: undefined,
    kind: 'pattern',
    pattern: undefined,
  });

  const validConfig = {
    highlight: true,
    kind: 'pattern',
    pattern: '{message}',
  };
  expect(layoutsSchema.validate(validConfig)).toEqual({
    highlight: true,
    kind: 'pattern',
    pattern: '{message}',
  });

  const wrongConfig2 = { kind: 'pattern', pattern: 1 };
  expect(() => layoutsSchema.validate(wrongConfig2)).toThrow();
});

test('`createConfigSchema()` creates correct schema for `json` layout.', () => {
  const layoutsSchema = Layouts.configSchema;

  const validConfig = { kind: 'json' };
  expect(layoutsSchema.validate(validConfig)).toEqual({ kind: 'json' });
});

test('`create()` creates correct layout.', () => {
  const patternLayout = Layouts.create({
    highlight: false,
    kind: 'pattern',
    pattern: '[{timestamp}][{level}][{context}] {message}',
  });
  expect(patternLayout).toBeInstanceOf(PatternLayout);

  const jsonLayout = Layouts.create({ kind: 'json' });
  expect(jsonLayout).toBeInstanceOf(JsonLayout);
});

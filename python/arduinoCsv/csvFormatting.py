import pandas as pd


df = pd.read_csv('./python/arduinoCsv/immaculate.csv')


df['time'] = pd.to_datetime(df['time'], format='%Y-%m-%dT%H:%M:%S.%fZ')


df['date'] = df['time'].dt.strftime('%Y-%m-%d')
df['time'] = df['time'].dt.strftime('%H:%M:%S')

formatted_df = df[['date', 'time', 'value']]

print(formatted_df.head())

formatted_df.to_csv('./website/vite-project/public/csv/formatted_immaculate.csv', index=False)

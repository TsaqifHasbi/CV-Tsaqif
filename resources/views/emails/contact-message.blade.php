<x-mail::message>
    # Pesan Baru dari Website Portfolio Anda

    **Nama:** {{ $data['name'] }}
    **Email:** {{ $data['email'] }}

    **Pesan:**
    <x-mail::panel>
        {{ $data['message'] }}
    </x-mail::panel>

    Harap membalas email ini untuk langsung menghubungi pengirim!

    Terima kasih,<br>
    System {{ config('app.name') }}
</x-mail::message>
